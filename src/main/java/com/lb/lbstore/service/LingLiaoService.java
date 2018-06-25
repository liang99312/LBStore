/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lb.lbstore.service;

import com.lb.lbstore.domain.LingLiao;
import java.util.HashMap;
import java.util.List;

/**
 *
 * @author Administrator
 */
public interface LingLiaoService {

    public LingLiao getLingLiaoById(Integer id);
    
    public LingLiao getLingLiaoDetailById(Integer id);
    
    public List<LingLiao> getAllLingLiaos(Integer qy_id);
    
    public boolean updateLingLiao(LingLiao lingLiao);
    
    public boolean dealLingLiao(LingLiao lingLiao,Integer a01_id);
    
    public LingLiao saveLingLiao(LingLiao lingLiao);
    
    public boolean deleteLingLiao(Integer id);
    
    public int queryRows(HashMap map);
    
    public List<LingLiao> queryLingLiaosByPage(HashMap map);

}
