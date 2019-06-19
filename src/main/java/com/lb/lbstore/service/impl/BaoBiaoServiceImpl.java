/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lb.lbstore.service.impl;

import com.lb.lbstore.dao.BaoBiaoDao;
import com.lb.lbstore.domain.BaoBiao;
import com.lb.lbstore.service.BaoBiaoService;
import java.util.ArrayList;
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
        List parameters = new ArrayList();
        parameters.add(qy_id);
        return baoBiaoDao.getResult("from BaoBiao baoBiao where qy_id=?", parameters.toArray());
    }

    @Override
    public List<BaoBiao> getBaoBiaosByMk(Integer qy_id, String mkdm) {
        List parameters = new ArrayList();
        parameters.add(qy_id);
        parameters.add(mkdm);
        return baoBiaoDao.getResult("from BaoBiao baoBiao where qy_id=? and mkdm='?'", parameters.toArray());
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
        List parameters = new ArrayList();
        parameters.add(map.get("qy_id"));
        String sql = "select count(1) from BaoBiao where qy_id=?";
        if (map.containsKey("mc")) {
            sql += " and mc like '%?%'";
            parameters.add(map.get("mc"));
        }
        if (map.containsKey("state")) {
            sql += " and state = ?";
            parameters.add(map.get("state"));
        }
        return baoBiaoDao.getCount(sql, parameters.toArray());
    }

    @Override
    public List<BaoBiao> queryBaoBiaosByPage(HashMap map) {
        List parameters = new ArrayList();
        parameters.add(map.get("qy_id"));
        String hql = "from BaoBiao where qy_id=?";
        if (map.containsKey("mc")) {
            hql += " and mc like '%?%'";
            parameters.add(map.get("mc"));
        }
        if (map.containsKey("state")) {
            hql += " and state = ?";
            parameters.add(map.get("state"));
        }
        return baoBiaoDao.getPageList(hql, parameters.toArray(), Integer.parseInt(map.get("beginRow").toString()), Integer.parseInt(map.get("pageSize").toString()));
    }

    @Override
    public int queryMkRows(HashMap map) {
        List parameters = new ArrayList();
        parameters.add(map.get("qy_id"));
        parameters.add(map.get("mkdm"));
        String sql = "select count(1) from BaoBiao where qy_id=? and mkdm='?'";
        if (map.containsKey("mc")) {
            sql += " and mc like '%?%'";
            parameters.add(map.get("mc"));
        }
        return baoBiaoDao.getCount(sql, parameters.toArray());
    }

    @Override
    public List<BaoBiao> queryMkBaoBiaosByPage(HashMap map) {
        List parameters = new ArrayList();
        parameters.add(map.get("qy_id"));
        parameters.add(map.get("mkdm"));
        String hql = "from BaoBiao where qy_id=? and mkdm='?'";
        if (map.containsKey("mc")) {
            hql += " and mc like '%?%'";
            parameters.add(map.get("mc"));
        }
        return baoBiaoDao.getPageList(hql, parameters.toArray(), Integer.parseInt(map.get("beginRow").toString()), Integer.parseInt(map.get("pageSize").toString()));
    }

}
