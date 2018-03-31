/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lb.lbstore.service.impl;

import com.lb.lbstore.dao.BaoBiaoDao;
import com.lb.lbstore.domain.BaoBiao;
import com.lb.lbstore.service.BaoBiaoService;
import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Administrator
 */
@Service("baoBiaoServiceImpl")
public class BaoBiaoServiceImpl implements BaoBiaoService {

    @Autowired
    private BaoBiaoDao baoBiaoDao;

    @Override
    public BaoBiao getBaoBiaoById(Integer id) {
        return (BaoBiao) baoBiaoDao.findObjectById(BaoBiao.class, id);
    }

    @Override
    public List<BaoBiao> getAllBaoBiaos(Integer qy_id) {
        return baoBiaoDao.getResult("from BaoBiao baoBiao where qy_id="+qy_id, null);
    }

    @Override
    public boolean updateBaoBiao(BaoBiao baoBiao) {
        return baoBiaoDao.update(baoBiao);
    }

    @Override
    public BaoBiao saveBaoBiao(BaoBiao baoBiao) {
        int id = baoBiaoDao.save(baoBiao);
        return (BaoBiao) baoBiaoDao.findObjectById(BaoBiao.class, id);
    }

    @Override
    public boolean deleteBaoBiao(Integer id) {
        return baoBiaoDao.deleteObjById("baoBiao", id);
    }

    @Override
    public int queryRows(HashMap map) {
        String sql = "select (1) from BaoBiao where qy_id="+map.get("qy_id");
        if (map.containsKey("mc")) {
            sql += " and mc like '%" + map.get("mc") + "%'";
        }
        if (map.containsKey("state")) {
            sql += " and state = " + map.get("state");
        }
        return baoBiaoDao.getCount(sql, null);
    }

    @Override
    public List<BaoBiao> queryBaoBiaosByPage(HashMap map) {
        String hql = "from BaoBiao where qy_id="+map.get("qy_id");
        if (map.containsKey("mc")) {
            hql += " and mc like '%" + map.get("mc") + "%'";
        }
        if (map.containsKey("state")) {
            hql += " and state = " + map.get("state");
        }
        return baoBiaoDao.getPageList(hql, null, 1, 20);
    }

}
