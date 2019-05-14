/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lb.lbstore.service.impl;

import com.lb.lbstore.dao.LingLiaoDao;
import com.lb.lbstore.domain.LingLiao;
import com.lb.lbstore.domain.LingLiaoDetail;
import com.lb.lbstore.service.LingLiaoService;
import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Administrator
 */
@Service("lingLiaoServiceImpl")
public class LingLiaoServiceImpl implements LingLiaoService {

    @Autowired
    private LingLiaoDao lingLiaoDao;

    @Override
    public LingLiao getLingLiaoById(Integer id) {
        return (LingLiao) lingLiaoDao.findObjectById(LingLiao.class, id);
    }
    
    @Override
    public LingLiaoDetail getLingLiaoDetailById(Integer id) {
        return  lingLiaoDao.getLingLiaoDetailById(id);
    }

    @Override
    public List<LingLiao> getAllLingLiaos(Integer qy_id) {
        return lingLiaoDao.getResult("from LingLiao lingLiao where qy_id="+qy_id, null);
    }

    @Override
    public boolean updateLingLiao(LingLiao lingLiao) {
        return lingLiaoDao.updateLingLiao(lingLiao);
    }

    @Override
    public LingLiao saveLingLiao(LingLiao lingLiao) {
        int id = lingLiaoDao.saveLingLiao(lingLiao);
        return (LingLiao) lingLiaoDao.findObjectById(LingLiao.class, id);
    }

    @Override
    public boolean deleteLingLiao(Integer id) {
        return lingLiaoDao.deleteLingLiao(id);
    }

    @Override
    public int queryRows(HashMap map) {
        String sql = "select (1) from LingLiao where qy_id="+map.get("qy_id");
        if (map.containsKey("mc")) {
            sql += " and mc like '%" + map.get("mc") + "%'";
        }
        if (map.containsKey("state")) {
            sql += " and state = " + map.get("state");
        }
        return lingLiaoDao.getCount(sql, null);
    }

    @Override
    public List<LingLiao> queryLingLiaosByPage(HashMap map) {
        return lingLiaoDao.queryLingLiaosByPage(map);
    }

    @Override
    public boolean dealLingLiao(LingLiao lingLiao,Integer a01_id) {
        return lingLiaoDao.dealLingLiao(lingLiao, a01_id);
    }
    
    @Override
    public int queryDetailRows(HashMap map) {
        String sql = "select (1) from LingLiao where qy_id="+map.get("qy_id");
        if (map.containsKey("mc")) {
            sql += " and mc like '%" + map.get("mc") + "%'";
        }
        if (map.containsKey("state")) {
            sql += " and state = " + map.get("state");
        }
        return lingLiaoDao.getCount(sql, null);
    }

    @Override
    public List<LingLiaoDetail> queryLingLiaoDetailsByPage(HashMap map) {
        return lingLiaoDao.queryLingLiaoDetailsByPage(map);
    }

    @Override
    public List<LingLiaoDetail> getLingLiaoDetailTop100(LingLiaoDetail detail) {
        return lingLiaoDao.queryLingLiaoDetailsTop100(detail);
    }

}
